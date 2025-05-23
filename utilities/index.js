exports.buildVehicleHtml = (vehicle) => {
    return `
      <div class="vehicle-detail">
        <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
        <h1>${vehicle.make} ${vehicle.model}</h1>
        <p><strong>Year:</strong> ${vehicle.year}</p>
        <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
        <p><strong>Description:</strong> ${vehicle.description}</p>
      </div>
    `
  }