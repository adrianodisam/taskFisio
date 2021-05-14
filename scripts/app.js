// Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyDJns2iuQqmKh-E6s--JFNwgLvHsFbl4bU",
    authDomain: "fisioterapia-4b862.firebaseapp.com",
    projectId: "fisioterapia-4b862",
    storageBucket: "fisioterapia-4b862.appspot.com",
    messagingSenderId: "52332556886",
    appId: "1:52332556886:web:c18282079b0d9a4a3e81f7",
    measurementId: "G-8878QPK2NL"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let auth = firebase.auth();

//autenticação usuário

function login() {
    let userEmail = document.getElementById("userEmail").value;
    let userSenha = document.getElementById("userSenha").value;
    event.preventDefault();

    auth.signInWithEmailAndPassword(userEmail, userSenha)
        .then((loggerUser) => {
            window.location.replace('lista.html');
            console.log(loggerUser);

        }).catch(error => {
            let ErrLoggin = document.getElementById("ErrLoggin");
            ErrLoggin.innerHTML = `<h6 class="mt-2 text-danger">Usuário ou senha Inválido</h6>`

        })
    let user = auth.currentUser;




}


function tarefa() {

    event.preventDefault();
    const Procedimento = document.getElementById("Procedimento");
    const nomePaciente = document.getElementById("nomePaciente");
    const inputHora = document.getElementById(" inputHoraDema ");
    const precoInput = document.getElementById("precoInput");

    // Cadastro de usuário
    function autenticação() {
        let auth = firebase.auth();
        event.preventDefault();
        const campoEmail = document.getElementById("inputEmail");
        const campoSenha = document.getElementById("inputSenha");

        auth.createUserWithEmailAndPassword(campoEmail.value, campoSenha.value)
            .then(() => {


            })
            .catch((error) => {

            });
        alert('cadastrado com sucesso!');
        setTimeout(() => {

        }, 2000);

    }


    const post = {
        Procedimento: Procedimento.value,
        Nome: nomePaciente.value,
        Hora: inputHora.value,
        Preço: precoInput.value
    }
    const addConsulta = db.collection("Fisioterapia");
    addConsulta.add(post).then(() => {
        document.location.reload(true);
    })


}


function lerDados() {

    db.collection("Fisioterapia").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {

            let colecao = doc.data();
            this.setTimeout(() => {
                document.getElementById("tss").innerHTML += `
                <table class="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Procedimento</th>
                        <th scope="col">Hora e Data</th>
                        <th scope="col">Preço</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                        </th>
                        <td>${colecao.Nome}</td>
                        <td>${colecao.Procedimento}</td>
                        <td>${colecao.Hora}</td>
                        <td>${colecao.Preço} R$</td>
                        <td><div><img src="./imagens/bucket-fill.svg" onclick="deleteTask('${doc.id}')"></div> </td>
                    </tr>
                </tbody>
            </table> `

            }, 1000);



        });
    });


}


function deleteTask(id) {
    db.collection("Fisioterapia").doc(id).delete().then(() => {
        alert("Deletado com sucesso!")
        document.location.reload(true);

    })

};
lerDados();