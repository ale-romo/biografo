import { NONAME } from "dns"
import { isComputedPropertyName } from "typescript"

API endpoints:

========================================
/api/login (get, post)
========================================
USE {credentials: 'include'}
Inputs:
{ 
    username: text, // An email address to contact the user
    password: text, // The password
}
Outputs:
JSON with req.session. Example output:
{
    users:	[],
    passport: { user: 2 },
    maxAge: 259200000,
    createdAt: 1676422306836
}

Example request:
GET /api/login?username=lorem@ipsum.com&password=asdfasdf
POST fetch('/api/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
  },
    credentials: 'include',
    body: JSON.stringify({
        username: 'lorem@ipsum.com',
        password: 'asdfasdf',
    })
}).then((res) => {console.log(res)})

========================================
/api/signup (post)
========================================
USE {credentials: 'include'}
Inputs:
{ 
    username: text, // An email address to contact the user
    password: text, // The password
}
Outputs:
JSON with req.session. Example output:
{
    users:	[],
    passport: { user: 2 },
    maxAge: 259200000,
    createdAt: 1676422306836
}

Example request:
POST fetch('/api/signup', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
  },
    credentials: 'include',
    body: JSON.stringify({
        username: 'lorem@ipsum.com',
        password: 'asdfasdf',
    })
}).then((res) => {console.log(res)})

========================================
/api/isloggedin (get, post)
========================================
USE {credentials: 'include'}
Inputs:
None
Outputs:
JSON with isloggedin Example output:
{
    isloggedin: true,
}

Example request:
GET /api/isloggedin
POST fetch('/api/isloggedin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
}).then((res) => {res.json().then((data) => {console.log(data)})})

========================================
/api/logout (post - expects AJAX)
========================================
USE {credentials: 'include'}
Inputs:
None
Outpus:
Redirect to '/'

Example Request:
POST fetch('/api/logout', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
}).then((res) => {res.json().then((data) => {console.log(data)})})

