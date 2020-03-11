import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Select } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import * as patientThunks from '../../redux/thunks/patient';

import { FormattedMessage } from 'react-intl';

const genderOptions = [
    { key: 'm', text: <FormattedMessage id="app.createPatient.gender.male"/>, value: 'male' },
    { key: 'f', text: <FormattedMessage id="app.createPatient.gender.female" />, value: 'female' }
];

class NewPatientFormContainer extends React.Component {
  savePatient = (event) => {
      event.preventDefault();
      const { name, birthDate } = this.state;
      console.log(this.state);
      // TODO: попробовать отправлять на бек данные о поле пациента
      const patientData = {
          name: name,
          birthDate: birthDate.toISOString().substring(0, 10),
          diseaseId: 1,
          doctorId: 1
      };

      this.props.create(patientData);
      alert('created');
  };

  handleOnChange = (value, attr) => this.setState({ [attr]: value });

  render () {
      return (
          <section className={'NewPatientForm'}>
              <h2><FormattedMessage id="app.createPatient.title"/></h2>
              <Form>
                  <Form.Field
                      label={<FormattedMessage id="app.createPatient.name"/>}
                      type="text"
                      control={Input}
                      onChange={(event) =>
                          this.handleOnChange(event.target.value, 'name')
                      }
                  />
                  <Form.Field
                      label={<FormattedMessage id="app.createPatient.gender" />}
                      control={Select}
                      options={genderOptions}
                      onChange={(event) =>
                          this.handleOnChange(event.target.innerText, 'gender')
                      }
                  />
                  <Form.Field>
                      <label><FormattedMessage id="app.createPatient.age" /></label>
                      <SemanticDatepicker
                          onDateChange={(date) => this.handleOnChange(date, 'birthDate')}
                      />
                  </Form.Field>
                  <Button
                      positive
                      icon="checkmark"
                      content={<FormattedMessage id="app.createPatient.submit" />}
                      type="submit"
                      onClick={this.savePatient}
                  />
              </Form>
          </section>
      );
  }
}

export const NewPatientForm = connect(null, {
    create: patientThunks.create
})(NewPatientFormContainer);
