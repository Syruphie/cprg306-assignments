import Link from "next/link";
import StudentInfoComponent from "./_week2-components/student-info";


export default function Page() {
    return (
        <main>
            <h1>Shopping list</h1>
            <StudentInfoComponent />

            <Link href="../">Back</Link>
            
        </main>
    );
}