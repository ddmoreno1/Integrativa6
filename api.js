class RandomUserComponent extends HTMLElement {
    connectedCallback() {
        this.getDataFromApi();
    }

    async getDataFromApi() {
        try {
            const apiUrl = 'https://randomuser.me/api/?results=5';
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            this.displayData(data.results);
        } catch (error) {
            console.error(error);
        }
    }

    displayData(data) {
        const container = document.createElement('div');
        container.className = 'user-list-container';

        const userList = document.createElement('ul');
        userList.className = 'user-list';

        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${user.picture.thumbnail}" alt="User Thumbnail">
                <h2>${user.name.first} ${user.name.last}</h2>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
            `;
            userList.appendChild(listItem);
        });

        container.appendChild(userList);
        this.innerHTML = ''; // Limpiar contenido existente antes de agregar el nuevo
        this.appendChild(container);
    }
}

customElements.define('random-user-component', RandomUserComponent);
