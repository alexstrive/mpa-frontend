const normalizeContradictions = (contradictions) =>
    contradictions.reduce((others, contradiction) => {
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
    LIGHT: { weight: 1, color: 'blue' }
};

const getContradictionLevelByWeight = (targetWeight) => {
    for (const [levelTitle, levelValues] of Object.entries(contradictionLevels)) {
        if (targetWeight === levelValues.weight) {
            return { ...levelValues, type: levelTitle };
        }
    }

    return null;
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

export const enchantWithContradictions = (drugs, contradictions) => {
    const normalizedContradictions = normalizeContradictions(contradictions);
    const medicineMaximumContradictionLevels = generateMaximumContradictionLevels(normalizedContradictions);

    return drugs.map(medicine => {
        const packedObject = {
            ...medicine,
            contradictions: normalizedContradictions[medicine.id] || []
        };

        packedObject.contradictions.MAX = medicineMaximumContradictionLevels[medicine.id];

        return packedObject;
    });
};
