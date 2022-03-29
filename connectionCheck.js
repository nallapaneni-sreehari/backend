
checkRequest();

function checkRequest()
{
  fetch('https://backend-149.herokuapp.com/connectionCheck',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res=>{

  });
}