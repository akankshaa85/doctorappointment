const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'harshada',
            database: 'doctor_appointment'
        }
    );

    try {
        await connection.connect();
        console.log("Connection Successful!");

        async function getDoctorData() {
            const [rows] = await connection.query("SELECT * FROM doctor");
            return rows;
        }

        async function getDoctor(d_id) {
            const [rows] = await connection.query(`
            SELECT * 
            FROM doctor
            WHERE d_id = ?
            `, [d_id]);
            return rows[0];
        }

        async function createNode(doctor_name, speciality, contact) {
            const [result] = await connection.query(`
            INSERT INTO doctor(doctor_name, speciality, contact)
            VALUES (?, ?, ?)
            `, [doctor_name, speciality, contact]);
            const d_id = result.insertId;
            return await getDoctor(d_id);
        }

        const result = await createNode('Harshada', 'MBBS', '9537115556');
        console.log(result);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await connection.end();
    }
}

main();