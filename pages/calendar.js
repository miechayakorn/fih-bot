import Heading6 from '@material-tailwind/react/Heading6'
import  Paragraph  from '@material-tailwind/react/Paragraph'

const Calendar = () => {
    return (
        <div>

            <div className="container max-w-7xl mx-auto">
                <div className="container max-w-7xl mx-auto px-4">
                    <Heading6 color="gray">Installation</Heading6>
                    <hr className="border border-t-0 border-r-0 border-l-0 border-b-1 border-gray-200 my-4" />

                    <div className="mt-16">
                        <div className="mb-16">
                            <Heading6 color="gray">NPM</Heading6>
                            <Paragraph color="gray">
                                Install Material Tailwind via NPM
                            </Paragraph>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Calendar
