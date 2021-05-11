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
            window.location.replace('index.html');
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
let cardAgen = document.getElementById(" list-tsss ");

function lerDados() {

    db.collection("Fisioterapia").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            let colecao = doc.data();
            this.setTimeout(() => {
                cardAgen.innerHTML += `
                <thead id="dados">
                </table>
                <tr>
                <th >${colecao.Nome }</th>
                <th>${colecao.Procedimento}</th>
                <th>${colecao.Hora}</th>
                <th>${colecao.Preço}<th>
                <div><img src="./imagens/bucket-fill.svg" onclick="deleteTask('${doc.id}')"></div>
               
              </tr>
            </thead>
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