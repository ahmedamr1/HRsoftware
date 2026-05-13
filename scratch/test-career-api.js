async function testAPI() {
    const baseUrl = 'http://localhost:3000';
    const employeeId = '4'; // Ahmed Amr
    try {
        const res = await fetch(`${baseUrl}/api/employees/${employeeId}/career-path`);
        const data = await res.json();
        console.log('API Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('API Test Failed:', error);
    }
}

testAPI();
