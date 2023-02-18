import { NONAME } from "dns"
import { isComputedPropertyName } from "typescript"

API endpoints:

========================================
/api/login (get, post)
========================================
USE {credentials: 'include'}
Inputs:
{ 
    username: Str, // An email address to contact the user
    password: Str, // The password
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
}).then((res) => {res.json().then((data) => {console.log(data)})})




========================================
/api/signup (post)
========================================
USE {credentials: 'include'}
Inputs:
{ 
    username: Str, // An email address to contact the user
    password: Str, // The password
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

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

========================================
:8888/sell (post AJAX or HTMLRequest)
========================================
Inputs:


1) name:               (Str) Nombre del objeto a vender
2) uid:     (int) El ID del usuario ligado al objeto. Se puede conseguir con:

const req = await fetch('/api/isloggedin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
});
const sessionjson = await req.json();
const uid = sessionjson.session.passport.user;

3) isAuction:          (int) 1 or 0 para ver si es subasta
4) description:        (Str)
5) story:              (Str) historia del objeto
6) endDate:            (Date formatted in ISO8601, such as given by:)
<input type="date" required="" name="endDate">
7) Files: Los archivos para cargar (Se ponen automáticamente en el form al subir, no requiren nombre)

NOTA: Se require endDate AUNQUE no sea subasta.

Outpus:
JSON con success: true o false y error si es pertinente




========================================
:8888/upload (post AJAX or HTMLRequest)
========================================
input:
1) uid:             (int) Numero identificador del objeto
2) objectID:        (int) Numero identificador del objeto al cual se sube el video
3) description:     (Str) Descripción del video
4) title:           (Str) Título del video
5) tags:            (Str) Tags, separados por espacios o comas. No tiene procesamiento en backend.
6) Files: Archivo codificado en Datastream

output:
JSON con success: true o false y error si es pertinente