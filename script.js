const username = document.querySelector('#username-input');
const email = document.querySelector('#email-input');
const password = document.querySelector('#password-input');
const gender = document.querySelector('#gender-input');
const submitButton = document.querySelector('#button-input');
const tableBody = document.querySelector('tbody');
let currentEditIndex=null;

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!username.value || !email.value || !password.value || !gender.value) {
        alert('Please fill out all fields.');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('UserData')) || [];
  
    for(user of userData){
      if(user.name==username.value||user.email==email.value){
        alert('registered user');
        return;
      }
    }
    
  if(currentEditIndex!=null){
    userData[currentEditIndex].name=username.value;
    userData[currentEditIndex].email=email.value;
    userData[currentEditIndex].password=password.value;
    userData[currentEditIndex].gender=gender.value;
    currentEditIndex=null;
  }
  else{
    userData.push({
        name: username.value,
        email: email.value,
        password: password.value,
        gender: gender.value
    });
  }

    localStorage.setItem('UserData', JSON.stringify(userData));
    
    username.value = '';
    email.value = '';
    password.value = '';
    gender.value = '';

    buildTable();
});

function buildTable() {
    const userData = JSON.parse(localStorage.getItem('UserData')) || [];
    tableBody.innerHTML = '';

    userData.forEach((item, index) => {
        const row = `<tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.password}</td>
                        <td>${item.gender}</td>
                        <td>
                            <button type="button" data-index="${index}" class="edit-button">Edit</button>
                            <button type="button" data-index="${index}" class="delete-button">Delete</button>
                        </td>
                    </tr>`;
        tableBody.innerHTML += row;
    });
  attachDeleteFunction();
  attachEditFunction();
}

function attachDeleteFunction(){
  const deleteEntry=document.querySelectorAll('.delete-button');
  deleteEntry.forEach(button=>{
    button.addEventListener('click',e=>{
      e.preventDefault();
      const index=button.getAttribute('data-index');
  const userData = JSON.parse(localStorage.getItem('UserData'));
  userData.splice(index,1);
  localStorage.setItem('UserData', JSON.stringify(userData));
      buildTable();
    })
  })
  
}

function attachEditFunction(){
  const editEntry=document.querySelectorAll('.edit-button');
  editEntry.forEach(button=>{
    button.addEventListener('click',e=>{
      e.preventDefault();
      currentEditIndex=button.getAttribute('data-index'); 
      let userData = JSON.parse(localStorage.getItem('UserData'));
      username.value=userData[currentEditIndex].name;
      email.value=userData[currentEditIndex].email;
      password.value=userData[currentEditIndex].password;
      gender.value=userData[currentEditIndex].gender;
      userData[currentEditIndex].name='';
      userData[currentEditIndex].email='';
      userData[currentEditIndex].password='';
      userData[currentEditIndex].gender='';
      localStorage.setItem('UserData', JSON.stringify(userData));
    })
  })
  
}

buildTable();
