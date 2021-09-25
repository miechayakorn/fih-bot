import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default (result) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>ตารางวันหยุดของสถาบันการเงิน</title>
                <meta name="description" content="ตารางวันหยุดของสถาบันการเงินตามธนาคารแห่งประเทศไทย (BOT)"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>ตารางวันหยุดของสถาบันการเงิน</h1>

                <p className={styles.description}>
                    กดถัดไปเพื่อเริ่ม <code className={styles.code}>{process.env.clientId}</code>
                </p>

                <p className={styles.description}>
                    <Link href="/calendar">
                        <a>
                            Go to Calendar
                        </a>
                    </Link>
                </p>
                <div className={styles.grid}>
                    {
                        result.data.result.data.map((data, index) => {
                            return <>
                                {index < 5 ?
                                    <a href="https://nextjs.org/docs" key={index} className={styles.card}>
                                        {/*{JSON.stringify(data)}*/}
                                        <h2>{data.DateThai} &rarr;</h2>
                                        <p>{data.HolidayDescriptionThai}</p>
                                    </a>
                                    : null}
                            </>
                        })
                    }
                </div>
            </main>
        </div>
    )
}


export async function getServerSideProps() {
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
        props: {data}, // will be passed to the page component as props
    }
}
