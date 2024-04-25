// Handle Google Sign-In
function handleCredentialResponse(response) {
    // Decoding JWT to get user info
    const jwt = response.credential;
    const payload = parseJwt(jwt);
  
    const userInfoDiv = document.getElementById("user-info");
    userInfoDiv.innerHTML = `
      <h2>User Info</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Picture:</strong> <img src="${payload.picture}" alt="User Picture"></p>
    `;
  }
  
  // Parse JWT to extract user info
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')
    );
    return JSON.parse(jsonPayload);
  }
  
  // Bind event listener for Google Identity
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: '41076435138-t2s6a012g1a9a5850eb44jaf8q7slqlp.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });
  
    google.accounts.id.p