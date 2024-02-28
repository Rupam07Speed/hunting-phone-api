const LoadPhone = async (phone,isShowAll) => {
  const phoneDataRes =  await fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`);
  const data = await phoneDataRes.json();
  const mobileData = data.data;
  // console.log(mobileData);
  displayPhone(mobileData,isShowAll);
}



const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-display-section');
    phoneContainer.textContent = "";
    const show = document.getElementById("show-all");
  
    if(phones.length>12 && !isShowAll)
    {
      show.classList.remove("hidden");
    }
    else{
      show.classList.add("hidden");
    }
    if(!isShowAll){
      phones = phones.slice(0,5);
    }
    
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
              <h2 class="card-title">${phone.phone_name}</h2>
              <div class="card-actions">
                <button onclick="handleDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
    `
    phoneContainer.append(phoneCard);
  });
  loadingSpinner(false);
}

const handleSearch = (isShowAll) => {
  loadingSpinner(true);
  let searchText = document.getElementById('search-field');
  const value = searchText.value;
  LoadPhone(value,isShowAll);
  
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

const handleShowAll = () => {
   handleSearch(true);
}

const handleDetails = async(id) =>{
  console.log(id);
  const phoneDetailsRes = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await phoneDetailsRes.json();
  const mobileData = data.data;
  showDetails(mobileData);
  console.log(mobileData);
}
const showDetails = (phone) => {
  show_details_modal.showModal();
  const showDetailsContainer = document.getElementById("details_container");
  showDetailsContainer.innerHTML = `
  <h3 class="font-bold text-lg">${phone.name}</h3>
<img src="${phone.image}" alt="">
<p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
<ul>
<li><b>Storage:</b> ${phone.
  mainFeatures.storage}</li>
<li><b>Display Size:</b> ${phone.
  mainFeatures.displaySize}</li>
<li><b>Chipset:</b> ${phone.
  mainFeatures.chipSet}</li>
<li><b>Memory:</b> ${phone.
  mainFeatures.memory}</li>
<li><b>Release date:</b>${phone.releaseDate}</li>
<li><b>Brand:</b> ${phone.brand}</li>
<li><b>GPS:</b>${phone.others.GPS}</li>
</ul>
  `
}
LoadPhone();