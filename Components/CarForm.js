import styles from '../styles/Home.module.css'

export default function CarForm() {

const handleForm = async (event) => {
    event.preventDefault();

    // form data -> object
    const form = new FormData(event.target);// clean Form
	const formData = Object.fromEntries(form.entries());
    console.log("form Data", formData);

	const res = await fetch("/api/car", {
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData),
		method: 'POST',
	});

  //  console.log("Response", res);

    if (res.status === 200) {
        alert("Car added");
    } else if (res.status === 400) {
        alert("Bad request");
    } else if (res.status === 500) {
        alert("Internal server error!!");
    } else {
        alert(" I don't know what the fuck is going on but it is an Error. ");
    }

    const result = await res.json();


    console.log("response", result);

//	console.log("response message", res.message);

}
    return (
        <div>
            <form onSubmit={handleForm} className={styles.main}>
            <h1 className={styles.title}>FORM</h1>
            <input name="make" placeholder="make" typeof="text" className={styles.input} />
            <input name="model" typeof="text" placeholder="model" className={styles.input}/>
            <input name="image" typeof="text" placeholder="Image Url" className={styles.input}/>
            <input name="description" typeof="text" placeholder="Description" className={styles.input}/>                

            <button type="submit" className={styles.button}>Create Car</button>
            </form>            
        </div>
    )
}
