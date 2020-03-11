import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import './NextState.css';
import AssociationForm from '../AssociationForm/AssociationForm';
import { FormattedMessage } from 'react-intl';

function getLabel (recommended) {
    if (recommended === null) {
        return {
            color: 'orange',
            text: <FormattedMessage id="app.patient.draft.nextState.notEnoughInformation" />
        };
    } if (!recommended) {
        return {
            color: 'red',
            text: <FormattedMessage id="app.patient.draft.nextState.notRecommend"/>
        };
    }
    return {
        color: 'green',
        text: <FormattedMessage id="app.patient.draft.nextState.recommend" />
    };
}
export const NextState = (props) => (
    <div className="States-NextState NextState">
        <AssociationForm position='right' getData={() => ({ predicate: `eq({status.state.id}, ${props.id})`, type: 'state' })} />
        <Label className="NextState-Label"
            color={getLabel(props.recommended).color} tag>
            {getLabel(props.recommended).text}
        </Label>
        <div className="NextState-Content">
            <h3 className='States-Heading'>
                {props.state.name}
            </h3>
            <p><FormattedMessage id="app.patient.draft.nextState.description" />: <FormattedMessage id={`state.${props.state.id}.description`} /></p>
            {props.errors && <div>
                <FormattedMessage id="app.patient.draft.nextState.errors.title" />:
                {props.errors.map((error, i) =>
                    <p key={i}><FormattedMessage id="app.patient.draft.nextState.errors.code" />: {error.code}, <FormattedMessage id="app.patient.draft.nextState.errors.reason" />: {error.reason}</p>
                )}
            </div>
            }
            <Button className="NextState-Button" basic color='teal'
                onClick={() => props.confirmState(props.state)}><FormattedMessage id="app.patient.draft.nextState.confirm" /></Button>
        </div>
    </div>
);
