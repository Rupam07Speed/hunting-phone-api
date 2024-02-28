const LoadPhone = async (phone) => {
  const phoneDataRes =  await fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`);
  const data = await phoneDataRes.json();
  const mobileData = data.data;
  // console.log(mobileData);
  displayPhone(mobileData);
}

const displayPhone = phones => {
  const phoneContainer = document.getElementById('phone-display-section');
    phoneContainer.textContent = "";
    phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList =`card w-96 bg-base-100 shadow-xl`;
    phoneCard.innerHTML =`
    <figure class="px-10 pt-10">
              <img
                src="${phone.image}"
                alt="Shoes"
                class="rounded-xl"
              />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
    `
    phoneContainer.append(phoneCard);
  });
  loadingSpinner(false);
}

const handleSearch = () => {
  loadingSpinner(true);
  let searchText = document.getElementById('search-field');
  const value = searchText.value;
  LoadPhone(value);
  
}

const loadingSpinner = (value) => {
  const spin = document.getElementById("spinner");
  if(value)
  {
    spin.classList.remove("hidden");
  }
  else{
    
    spin.classList.add('hidden');
  }
}

LoadPhone();