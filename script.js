async function fetchNationalDebt() {
    const url = 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?format=json&sort=-record_date&limit=1';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching national debt data:', error);
        return null;
    }
  }
  
  async function displayNationalDebt() {
    const debtData = await fetchNationalDebt();
    console.log('Debt Data:', debtData);
    if (debtData && debtData.data) {
        const firstDataRow = debtData.data[0];
        if (firstDataRow) {
            const totalPublicDebtOutstanding = firstDataRow.tot_pub_debt_out_amt;
            if (totalPublicDebtOutstanding !== undefined && totalPublicDebtOutstanding !== null) {
                console.log('Total Public Debt Outstanding:', totalPublicDebtOutstanding);
                const firstTwoDigits = totalPublicDebtOutstanding.toString().slice(0, 2);
                console.log('First Two Digits:', firstTwoDigits);
                const fedHighScoreBox = document.getElementById('fedhighscoreBox');
                console.log('Fed High Score Box:', fedHighScoreBox);
                if (fedHighScoreBox) {
                    fedHighScoreBox.textContent = `Fed's Score: $${totalPublicDebtOutstanding} Trillion`;
                } else {
                    console.error('Fed High Score Box not found.');
                }
            } else {
                console.error('Total public debt outstanding data not available or null/undefined.');
                const fedHighScoreBox = document.getElementById('fedhighscoreBox');
                if (fedHighScoreBox) {
                    fedHighScoreBox.textContent = `Fed's Score: Data Not Available`;
                } else {
                    console.error('Fed High Score Box not found.');
                }
            }
        } else {
            console.error('No data rows found.');
        }
    } else {
        console.log('Failed to fetch national debt data or data format is incorrect.');
    }
  }
  
  displayNationalDebt();