import { useState } from 'react'
import { Button, Input, Modal, Text } from '@nextui-org/react'
import toast, { Toaster } from 'react-hot-toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const DisplayCalendarModal = () => {
    const [visible, setVisible] = useState(false)
    const iCalCalendar = 'https://calendar.google.com/calendar/ical/owner-fih%40fiholiday.iam.gserviceaccount.com/public/basic.ics'

    const closeHandler = () => {
        setVisible(false)
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
            closeButton
            aria-labelledby="modal-title"
            blur
            open={visible}
            onClose={() => closeHandler()}
        >
            <Modal.Header>
                <Text b size={18}>
                    ที่อยู่ iCal ปฏิทิน
                </Text>
            </Modal.Header>
            <Modal.Body>
                <CopyToClipboard
                    onCopy={() => toast.success('Copied')}
                    options={{message: 'Whoa!'}}
                    text={iCalCalendar}>
                    <Input
                        size="lg"
                        contentRightStyling={false}
                        bordered
                        readOnly={true}
                        value={iCalCalendar}
                    />
                </CopyToClipboard>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={() => closeHandler()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default DisplayCalendarModal
