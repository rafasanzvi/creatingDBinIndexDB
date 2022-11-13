let DB

document.addEventListener("DOMContentLoaded", () => {
    crmDB()

    setTimeout(() => {
        createClient()
    }, 5000)
})

function crmDB() {
    //Create database version 1.0
    //If we write in the console window.indexDB we can get the indexDB methods ready to use
    let crmDB = window.indexedDB.open("crm", 1) //The open method recive an string and the version number

    // If we have an error
    crmDB.onerror = function () {
        console.log("There was an error creating the DB")
    }
    // If everything is OK
    crmDB.onsuccess = function () {
        console.log("The data base was created")

        DB = crmDB.result
    }

    // if (crmDB) {
    //     crmDB.onsuccess = function () {
    //         console.log("The data base was created")
    //     }
    // } else {
    //     crmDB.onerror = function () {
    //         console.log("There was an error creating the DB")
    //     }
    // }

    // Database configuration
    crmDB.onupgradeneeded = function (e) {
        const db = e.target.result
        
        const objectStore = db.createObjectStore("crm", {
            keyPath: "crm",
            autoIncrement: true
        })

        // Define the colums of DB
        objectStore.createIndex("name", "name", { unique: false })
        objectStore.createIndex("email", "email", { unique: true })
        objectStore.createIndex("phone", "phone", { unique: false })

        console.log("Columns created")
    }
}

function createClient() {
    let transaction = DB.transaction(["crm"], "readwrite")

    transaction.oncomplete = function() {
        console.log("Transaction completed")
    }

    transaction.onerror = function() {
        console.log("There was an error in the transaction")
    }

    //To write an object in our database
    const objectStore = transaction.objectStore("crm")

    const newClient = {
        name: "Rafi junior",
        email: "lacositamaspreciosita@gmail.com",
        phone: 640675264
    }

    const request = objectStore.add(newClient) // The add method is used to add a new client
                                               // To edit we can use the put method
                                               // To delete we can use the delete method
                                               // The kind of method known like CRUD

    console.log("I am the request", request)
}


