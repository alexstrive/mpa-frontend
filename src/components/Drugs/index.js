import React from 'react';
import { Select, Popup, Dropdown } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import AssociationForm from '../AssociationForm/AssociationForm';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

const normalizeContradictions = (contradictions) => contradictions.reduce((others, contradiction) => {
    const contradictionsByMedicine = contradiction.medicines.map(medicineId => {
        const normalizedContradiction = {
            id: contradiction.reason.id,
            level: contradiction.level,
            type: contradiction.reason.type
        };

        if (others[medicineId]) {
            return ([medicineId, [...others[medicineId], normalizedContradiction]]);
        }

        return ([medicineId, [normalizedContradiction]]);
    }).reduce((before, [medicineId, contradictionIds]) =>
        ({ ...before, [medicineId]: contradictionIds }),
    {});

    return {
        ...others,
        ...contradictionsByMedicine
    };
}, {});

const contradictionLevels = {
    HIGH: { weight: 3, color: 'red' },
    AVERAGE: { weight: 2, color: 'orange' },
    LOW: { weight: 1, color: 'blue' },
    NONE: { weight: 0, color: 'none' }
};

const getContradictionLevelByWeight = (targetWeight) => {
    for (const levelValues of Object.values(contradictionLevels)) {
        if (targetWeight === levelValues.weight) {
            return levelValues;
        }
    }

    return contradictionLevels.NONE;
};

const generateMaximumContradictionLevels = (contradictions) =>
    Object.fromEntries(Object.entries(contradictions)
        .map(([medicineId, contradictionsByMedicine]) => (
            [medicineId,
                Math.max(
                    ...contradictionsByMedicine
                        .map(contradiction => contradictionLevels[contradiction.level].weight)
                )
            ])
        ).map(([medicineId, maxContradictionWeight]) =>
            [medicineId, getContradictionLevelByWeight(maxContradictionWeight)]
        )
    );

const Drugs = ({ medicines, toChoose, onChange }) => {
    const patient = useSelector(state => state.patient);
    const { data: contradictions } = useSWR(`${process.env.REACT_APP_CONTRADICTIONS_ENDPOINT_URL}?patientId=${patient.id}`, { suspense: true });

    const normalizedContradictions = normalizeContradictions(contradictions);

    const medicineMaximumContradictionLevels = generateMaximumContradictionLevels(normalizedContradictions);

    return (
        <div>
            <h3><FormattedMessage id="app.patient.draft.drugs" /></h3>
            {medicines.map((medicine, index) => {
                const maxContradictionLevel = medicineMaximumContradictionLevels[medicine.id] || contradictionLevels.NONE;

                return (
                    <div className='Draft-StatusFormContainer' key={index}>
                        <Popup
                            trigger={
                                <Dropdown.Item
                                    label={{ color: maxContradictionLevel.color, circular: true, empty: true }}
                                    text={ <FormattedMessage id={`drug.${medicine.id}`} />}
                                />
                            }
                        >
                            <Popup.Header style={{ color: maxContradictionLevel.color }}>
                                <FormattedMessage id={`contradiction.level.${'HIGH'}`}/>
                            </Popup.Header>
                            <Popup.Content>

                            </Popup.Content>
                        </Popup>
                        <AssociationForm
                            style={{ position: 'relative' }}
                            getData={() => ({
                                predicate: `eq({medicine.id}, ${medicine.id})`,
                                type: 'medicine'
                            })}
                        />
                    </div>
                );
            })}
            {toChoose.length > 0 && (
                <div className='Draft-StatusFormContainer'>
                    <Select
                        placeholder={<FormattedMessage id="app.patient.draft.drugs.placeholder" />}
                        options={toChoose.map(medicine => {
                            const maxContradictionLevel = medicineMaximumContradictionLevels[medicine.id] || contradictionLevels.NONE;

                            return {
                                value: medicine.id,
                                key: medicine.id,
                                text: <FormattedMessage id={`drug.${medicine.id}`} />,
                                label: { circular: true, empty: true, color: maxContradictionLevel.color }
                            };
                        })}
                        onChange={onChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Drugs;
