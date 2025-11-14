class HomeCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
      .text-content h1 {
          witdh: 400px;
          margin-left: 4rem;
          font-size: 4rem;
        }
        .InfoCardContainer {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cardBox {
          margin: 1%;
          width: 22%;
          height: 600px;
          border: 0px;
          border-radius: 20px;
          box-shadow: 2px 2px 15px 0.5px black;
          object-fit: cover;
          background-color: white;
        }
        .cardImg {
          margin: 2%;
          width: 96%;
          height: 60%;
          border: 0px;
          border-radius: 18px;
          object-fit: cover;
        }
        .cardText {
          margin: 5%;
          text-align: center;
          font-family: sans-serif;
        }
      </style>
      <div class="text-content">
          <h1>Highlights</h1>
      </div>
      <div class="InfoCardContainer">
        ${this.generateCards(4)}
      </div>
    `;
  }

  generateCards(count) {
    const imageSrc = '../Media/resourceimage.jpg';
    const text = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni repellat quos quae magnam iste. Quam quisquam ullam voluptatibus et est doloremque voluptatum, reprehenderit exercitationem deserunt sequi sint, non, distinctio illum.`;

    return Array.from({ length: count }).map(() => `
      <div class="cardBox">
        <img src="${imageSrc}" class="cardImg" alt="Info Card Image">
        <p class="cardText">${text}</p>
      </div>
    `).join('');
  }
}

customElements.define('home-card', HomeCard);
