import Header from '../components/header'
import Button from '@material-tailwind/react/Button'
import Heading3 from '@material-tailwind/react/Heading3'
import CardDate from '../components/cardDate'
import { useEffect, useState } from 'react'

export default function Index(result) {
    const [filterSelect, setFilterSelect] = useState('all')
    const [data, setData] = useState([])

    const filter = [
        {
            title: 'ทั้งปี 2021',
            value: 'all'
        },
        {
            title: 'ที่กำลังมาถึง',
            value: 'upcoming'
        }
    ]

    const onChangeFilter = (fihData) => {
        if (filterSelect === 'upcoming') {
            let dateNow = new Date().toJSON().slice(0, 10)
            console.log(dateNow)
            const result = fihData.filter(date => date.Date > dateNow)
            setData(result)
        } else {
            setData(fihData)
        }
    }

    useEffect(() => {
        onChangeFilter(result.data.result.data)
    }, [filterSelect])

    return (
        <div>
            <Header/>
            <section className="header relative items-center flex">
                <div className="container max-w-7xl mx-auto mb-12 mt-3">
                    <div className="text-center">
                        <Heading3>ตารางวันหยุดของสถาบันการเงิน</Heading3>
                        <div className="flex flex-wrap">{
                            filter.map((data, index) => {
                                return <Button onClick={() => setFilterSelect(data.value)} className="ml-2"
                                               buttonType={data.value === filterSelect ? null : 'outline'}
                                               color="lightBlue" size="lg" rounded={true} ripple="light" key={index}>
                                    {data.title}
                                </Button>
                            })
                        }
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-100 pb-20">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap">
                        {
                            data.map((data, index) => {
                                return <div className="mt-12 mx-5" key={index}>
                                    <CardDate data={data} key={index}/>
                                </div>
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}


export const getServerSideProps = async () => {
    const res = await fetch(`http://localhost:3000/api/mock`)
    const data = await res.json()

    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {data}, // will be passed to the page components as props
    }
}
