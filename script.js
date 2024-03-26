const scriptURL = 'https://script.google.com/macros/s/AKfycbwAX52lvOfgaP6P0U9jiF_ZEwppXCuzSxZXYMtTXPj85yU3Lig2sHXb8kvKPXceWl0Kcg/exec';
const form = document.forms['submit-to-google-sheet'];
const submitButton = form.querySelector('button[type="submit"]');
const subjectDropdown = document.querySelector('select[name="Subject"]');
const departmentDropdown = document.querySelector('select[name="Department"]');
const yearDropdown = document.querySelector('select[name="Year"]');
const semesterDropdown = document.querySelector('select[name="Semester"]');

const subjectsByYearSemesterAndDept = {
  1: {
      1: {
          CST: ["Subject 1", "Subject 2", "Subject 3"],
          EE: ["Subject 4", "Subject 5", "Subject 6"],
          ECE: ["Subject 7", "Subject 8", "Subject 9"]
      },
      2: {
          CST: ["Subject 10", "Subject 11", "Subject 12"],
          EE: ["Subject 13", "Subject 14", "Subject 15"],
          ECE: ["Subject 16", "Subject 17", "Subject 18"]
      }
  },
  2: {
      3: {
          CST: ["Subject 19", "Subject 20", "Subject 21"],
          EE: ["Subject 22", "Subject 23", "Subject 24"],
          ECE: ["Subject 25", "Subject 26", "Subject 27"]
      },
      4: {
          CST: ["Subject 28", "Subject 29", "Subject 30"],
          EE: ["Subject 31", "Subject 32", "Subject 33"],
          ECE: ["Subject 34", "Subject 35", "Subject 36"]
      }
  },
  3: {
      5: {
          CST: ["Subject 37", "Subject 38", "Subject 39"],
          EE: ["Subject 40", "Subject 41", "Subject 42"],
          ECE: ["Subject 43", "Subject 44", "Subject 45"]
      },
      6: {
          CST: ["Subject 46", "Subject 47", "Subject 48"],
          EE: ["Subject 49", "Subject 50", "Subject 51"],
          ECE: ["Subject 52", "Subject 53", "Subject 54"]
      }
  }
};

// Function to populate semester dropdown based on selected year
function populateSemesters() {
    const selectedYear = yearDropdown.value;
    
    // Clear existing options
    semesterDropdown.innerHTML = '<option value="">Select Semester</option>';
    
    // Populate semesters based on the selected year
    if (selectedYear) {
        if (selectedYear === "1") {
            // For 1st year, show only 1st and 2nd semesters
            for (let i = 1; i <= 2; i++) {
                const option = document.createElement('option');
                option.textContent = `${i} Semester`;
                option.value = i;
                semesterDropdown.appendChild(option);
            }
        } else if (selectedYear === "2") {
            // For 2nd year, show only 3rd and 4th semesters
            for (let i = 3; i <= 4; i++) {
                const option = document.createElement('option');
                option.textContent = `${i} Semester`;
                option.value = i;
                semesterDropdown.appendChild(option);
            }
        } else if (selectedYear === "3") {
            // For 3rd year, show only 5th and 6th semesters
            for (let i = 5; i <= 6; i++) {
                const option = document.createElement('option');
                option.textContent = `${i} Semester`;
                option.value = i;
                semesterDropdown.appendChild(option);
            }
        }
    }
}


// Function to populate subject dropdown based on selected year, semester, and department
function populateSubjects() {
    const selectedYear = yearDropdown.value;
    const selectedSemester = semesterDropdown.value;
    const selectedDepartment = departmentDropdown.value;
    
    // Clear existing options
    subjectDropdown.innerHTML = '<option value="">Select Subject</option>';
    
    // Populate subjects if all dropdowns have been selected
    if (selectedYear && selectedSemester && selectedDepartment) {
        const subjects = subjectsByYearSemesterAndDept[selectedYear][selectedSemester][selectedDepartment];
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.textContent = subject;
            option.value = subject;
            subjectDropdown.appendChild(option);
        });
    }
}

// Event listeners for dropdown changes
yearDropdown.addEventListener('change', () => {
    populateSemesters();
    populateSubjects();
});

semesterDropdown.addEventListener('change', populateSubjects);
departmentDropdown.addEventListener('change', populateSubjects);

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    // Disable the submit button and display loading text
    submitButton.disabled = true;
    submitButton.innerHTML = 'Submitting...';

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            if (response.ok) {
                console.log('Success!', response);
                // Redirect to thankyou.html
                window.location.href = 'thankyou.html';
            } else {
                console.error('Error!', response.statusText);
                throw new Error('Failed to submit form');
            }
        })
        .catch(error => {
            console.error('Error!', error.message);
        })
        .finally(() => {
            // Re-enable the submit button with original text and clear form inputs
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send';
            form.reset();
        });
});
