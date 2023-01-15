import { useState } from 'react'
import { Button, Input, Loading, Modal, Text } from '@nextui-org/react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Mail } from './icon/Mail'
import { emailRegex } from '../helper/validate'

const DisplayCalendarModal = () => {
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // const iCalCalendar = 'https://calendar.google.com/calendar/ical/owner-fih%40fiholiday.iam.gserviceaccount.com/public/basic.ics'

    const closeHandler = () => {
        setVisible(false)
    }

    const onSubmit = async () => {
        setIsLoading(true)
        if (email) {
            if (!emailRegex.test(email)) {
                toast.error('กรุณาใช้รูป ...@gmail.com เท่านั้น')
                setIsLoading(false)
                return
            }
            try {
                await axios.get('/api/calendar/user?email=' + email)
                toast.success('เพิ่มสำเร็จ! โปรดตรวจสอบอีเมล ' + email)
            } catch (e) {
                toast.error('พบข้อผิดพลาด ' + e)
            }
            setEmail(null)
            closeHandler()
        } else {
            toast.error('กรุณาระบุ Email')
        }
        setIsLoading(false)
    }

    return <div>
        <Toaster
            containerStyle={{
                zIndex: 10000
            }}
            toastOptions={{
                duration: 5000
            }}
        />
        <Text css={{mb: 20, cursor: 'pointer'}} onClick={() => setVisible(true)}>
            เชื่อมต่อกับปฏิทิน
        </Text>
        <Modal
            style={{margin: '20px'}}
            closeButton
            aria-labelledby="modal-title"
            blur
            open={visible}
            onClose={() => closeHandler()}
        >
            <Modal.Header>
                <Text b size={18}>
                    เชื่อมปฏิทินเข้าบัญชี Gmail
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    clearable
                    bordered
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    color="primary"
                    size="lg"
                    placeholder="example@gmail.com"
                    contentLeft={<Mail fill="currentColor"/>}
                />
                {/*<CopyToClipboard*/}
                {/*    onCopy={() => toast.success('Copied')}*/}
                {/*    options={{message: 'Whoa!'}}*/}
                {/*    text={iCalCalendar}>*/}
                {/*    <Input*/}
                {/*        size="lg"*/}
                {/*        contentRightStyling={false}*/}
                {/*        bordered*/}
                {/*        readOnly={true}*/}
                {/*        value={iCalCalendar}*/}
                {/*    />*/}
                {/*</CopyToClipboard>*/}
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={() => closeHandler()}>
                    Close
                </Button>
                <Button disabled={isLoading} auto onPress={() => onSubmit()}>
                    {isLoading ? <Loading type="points" color="currentColor" size="sm"/> : 'Submit'}
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default DisplayCalendarModal
