import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Calendar = () => {
    return (
        <div>


            <div className={styles.grid}>
                <div className={styles.card}>
                    <h2>Documentation &rarr;</h2>
                    <p>Find in-depth information about Next.js features and API.</p>
                </div>
            </div>
        </div>
    )

}

export default Calendar
