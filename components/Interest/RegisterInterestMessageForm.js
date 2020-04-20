
import { Button, Modal, Icon, Upload, message } from 'antd'
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea'
import { FormattedMessage } from 'react-intl'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
/* when person clicks I'm Interested a popup form shows a text field
 and check box for accept terms, click the terms string to open terms in another window
 OK on the text box completes the interested record with the given message
 Cancel just returns to the previous state.
 This happens each time the state is changed.

 Form calls back onSubmit false if cancelled and form fields in ok.
 */

const showStaySafe = true;
const maxMessageLength = 400;

const uploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UploadArea = styled.div`
  margin-bottom: 30px;
`

const staySafeUrl = 'https://www.police.govt.nz/advice-services/cybercrime-and-internet/internet-safety'
export const RegisterInterestMessageForm = ({
  visible,
  onSubmit,
  title, prompt, showTerms
}) => {
  const [message, setMessage] = useState('')
  const handleOk = (e) => {
    onSubmit(true, message)
  }
  const handleCancel = (e) => {
    onSubmit(false)
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      footer={[

        <Button
          key='submit' id='sendBtn' type='primary' shape='round'
          onClick={handleOk}
        >
          <FormattedMessage id='RegisterInterestMessageForm.send' defaultMessage='Send' description='Send button on popup form' />
        </Button>,
        <Button id='cancelBtn' key='esc' shape='round' onClick={handleCancel}>
          <FormattedMessage id='RegisterInterestMessageForm.cancel' defaultMessage='Cancel' description='Cancel button on popup form' />
        </Button>
      ]}
    >
      <UploadArea>
        <p>Upload a CV or cover letter:</p>
        <Upload { ...uploadProps }>
          <Button>
            <UploadOutlined /> Click to upload
          </Button>
        </Upload>
      </UploadArea>
      <p>{prompt}</p>
      <TextArea
        rows='3'
        maxLength={maxMessageLength}
        value={message}
        onChange={e => {
          setMessage(e.target.value)
        }}
        style={{ marginBottom: '1rem' }}
      />
      {showTerms && (
        <p>
          <FormattedMessage
            id='RegisterInterestMessageForm.accepttcs'
            defaultMessage='By clicking Send you agree to the '
          />
          <a
            href='/terms'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FormattedMessage
              id='RegisterInterestMessageForm.termsandconditions'
              defaultMessage='Terms and Conditions'
            />
          </a>
        </p>)}
      {showStaySafe && (
        <p style={{ float: 'right' }}>
          <Icon type='warning' theme='twoTone' twoToneColor='#6549AA' />&nbsp;
          <a href={staySafeUrl} target='_blank' rel='noopener noreferrer'>
            <FormattedMessage
              id='RegisterInterestMessageForm.staysafeonline'
              defaultMessage='Stay safe online'
            />
          </a>
        </p>
      )}
    </Modal>

  )
}

export default RegisterInterestMessageForm
