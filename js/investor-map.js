/**
 * Investor Map Functionality
 * Uses Leaflet.js to display investor locations
 */

function initInvestorMap() {
    const mapElement = document.getElementById('investorMap');
    if (!mapElement) return;
    
    // In a real app, you would fetch this data from an API
    const investors = [
        { id: 1, name: 'John Doe', lat: -6.7924, lng: 39.2083, type: 'angel' },
        { id: 2, name: 'Jane Smith', lat: -6.8000, lng: 39.2833, type: 'vc' },
        { id: 3, name: 'Mike Johnson', lat: -6.7500, lng: 39.2500, type: 'angel' },
        { id: 4, name: 'Sarah Williams', lat: -6.7800, lng: 39.2700, type: 'vc' },
        { id: 5, name: 'David Brown', lat: -6.8100, lng: 39.2200, type: 'angel' },
    ];
    
    // Initialize the map centered on Dar es Salaam
    const map = L.map('investorMap').setView([-6.7924, 39.2083], 12);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Define custom icons for different investor types
    const iconTypes = {
        angel: {
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        },
        vc: {
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }
    };
    
    // Add markers for each investor
    investors.forEach(investor => {
        const icon = L.icon(iconTypes[investor.type] || iconTypes.angel);
        
        L.marker([investor.lat, investor.lng], { icon: icon })
            .addTo(map)
            .bindPopup(`
                <div class="p-2">
                    <h4 class="font-semibold">${investor.name}</h4>
                    <p class="text-sm text-gray-600">${investor.type === 'angel' ? 'Angel Investor' : 'Venture Capitalist'}</p>
                    <button onclick="showInvestorModal(${investor.id})" 
                            class="mt-2 text-sm text-blue-600 hover:underline">
                        View Profile →
                    </button>
                </div>
            `);
    });
    
    // Add legend
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'bg-white p-3 rounded shadow-md text-sm');
        div.innerHTML = `
            <h4 class="font-semibold mb-2">Legend</h4>
            <div class="flex items-center mb-1">
                <img src="${iconTypes.angel.iconUrl}" alt="Angel Investor" class="w-4 h-6 mr-2">
                <span>Angel Investor</span>
            </div>
            <div class="flex items-center">
                <img src="${iconTypes.vc.iconUrl}" alt="Venture Capitalist" class="w-4 h-6 mr-2">
                <span>Venture Capitalist</span>
            </div>
        `;
        return div;
    };
    
    legend.addTo(map);
}
