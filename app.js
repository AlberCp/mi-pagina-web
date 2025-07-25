// API Keys
// Tu clave de OpenWeatherMap. Puedes usar la de APP.js (0809f68efeccec6b1cd3b7f1ce3510aa)
// o la que estaba en INDEX.html (51479172-3651c977b27750fd901da1da2), pero esta última es la de Pixabay.
// Asegúrate de usar una clave válida para OpenWeatherMap aquí.
const WEATHER_API_KEY = '0809f68efeccec6b1cd3b7f1ce3510aa'; // Clave de OpenWeatherMap
const PIXABAY_API_KEY = '51479172-3651c977b27750fd901da1da2'; // Tu clave de Pixabay

document.getElementById('weatherForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const city = document.getElementById('city').value.trim();
    if (!city) return;
    
    const resultDiv = document.getElementById('result');
    
    // Mostrar loading
    resultDiv.innerHTML = '<div class="loading">🔄 Consultando el clima...</div>';
    
    try {
        // Obtener datos del clima
        const weatherData = await getWeatherData(city);
        
        // Obtener imagen de la ciudad usando Pixabay
        const cityImage = await getCityImage(city);
        
        // Mostrar resultados
        displayWeatherData(weatherData, cityImage);
        
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `
            <div class="error">
                <h3>❌ Error al consultar el clima</h3>
                <p>${error.message}</p>
                <p>Verifica que la ciudad esté bien escrita e intenta nuevamente.</p>
            </div>
        `;
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=es`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.cod !== 200) {
        throw new Error(data.message || 'Ciudad no encontrada');
    }
    
    return data;
}

async function getCityImage(city) {
    // Intentar obtener imagen desde Pixabay API
    try {
        // Construye la URL de Pixabay. Buscamos 'nombre_ciudad city' para mejorar la relevancia.
        const pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(city + ' city')}&image_type=photo&pretty=true&per_page=3`;
        const response = await fetch(pixabayUrl);
        const data = await response.json();
        
        if (data.hits && data.hits.length > 0) {
            // Pixabay usualmente retorna 'webformatURL' para uso general
            return data.hits[0].webformatURL;
        }
    } catch (error) {
        console.log('Error obteniendo imagen de Pixabay:', error);
    }
    
    // Sistema de respaldo con imágenes predefinidas más extenso (del INDEX.html original)
    const cityImages = {
        // España
        'madrid': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&h=300&fit=crop',
        'barcelona': 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=500&h=300&fit=crop',
        'valencia': 'https://images.unsplash.com/photo-1624712981334-f0f5b9d65db8?w=500&h=300&fit=crop',
        'sevilla': 'https://images.unsplash.com/photo-1551603020-4a9b6b4e58b6?w=500&h=300&fit=crop',
        'bilbao': 'https://images.unsplash.com/photo-1562409052-0678e2d4c1bd?w=500&h=300&fit=crop',
        'málaga': 'https://images.unsplash.com/photo-1564431863-8b5be7c5e2eb?w=500&h=300&fit=crop',
        'malaga': 'https://images.unsplash.com/photo-1564431863-8b5be7c5e2eb?w=500&h=300&fit=crop',
        'zaragoza': 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=300&fit=crop',
        'murcia': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop',
        'palma': 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=300&fit=crop',
        'las palmas': 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=500&h=300&fit=crop',
        'vigo': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop',
        'córdoba': 'https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=500&h=300&fit=crop',
        'cordoba': 'https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=500&h=300&fit=crop',
        'alicante': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=300&fit=crop',
        'gijón': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop',
        'gijon': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop',
        'santander': 'https://images.unsplash.com/photo-1580055733818-9b53b2b33474?w=500&h=300&fit=crop',
        'granada': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500&h=300&fit=crop',
        'santiago de compostela': 'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=500&h=300&fit=crop',
        'toledo': 'https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=500&h=300&fit=crop',
        'salamanca': 'https://images.unsplash.com/photo-1576488485812-965d5b6c8c9b?w=500&h=300&fit=crop',
        'cádiz': 'https://images.unsplash.com/photo-1517685563424-80f0df7c8828?w=500&h=300&fit=crop',
        'cadiz': 'https://images.unsplash.com/photo-1517685563424-80f0df7c8828?w=500&h=300&fit=crop',
        'pamplona': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop',
        'vitoria': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop',
        'badajoz': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop',
        'logroño': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop',
        'logros': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop',
        
        // Otras ciudades internacionales
        'paris': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=300&fit=crop',
        'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=300&fit=crop',
        'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=300&fit=crop',
        'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop',
        'rome': 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=500&h=300&fit=crop',
        'berlin': 'https://images.unsplash.com/photo-1587330979470-3ce4ca0e3a8f?w=500&h=300&fit=crop',
        'amsterdam': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=500&h=300&fit=crop',
        'lisboa': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=500&h=300&fit=crop',
        'lisbon': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=500&h=300&fit=crop'
    };
    
    // Buscar la imagen de la ciudad (sin acentos también)
    const cityKey = city.toLowerCase().trim();
    const cityKeyNoAccents = removeAccents(cityKey); // Asegúrate de que esta función esté definida

    return cityImages[cityKey] || 
           cityImages[cityKeyNoAccents] || 
           'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&h=300&fit=crop'; // Imagen genérica de ciudad
}

// Función auxiliar para quitar acentos (extraída del INDEX.html original)
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function displayWeatherData(data, cityImage) {
    const resultDiv = document.getElementById('result');
    
    const weatherHTML = `
        <div class="weather-result">
            <div class="city-header">
                <h2 class="city-name">${data.name}, ${data.sys.country}</h2>
                <img src="${cityImage}" alt="${data.name}" class="city-image" onerror="this.style.display='none'">
            </div>
            
            <div class="main-weather">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                     alt="${data.weather[0].description}" class="weather-icon">
                <div>
                    <div class="temperature">${Math.round(data.main.temp)}°C</div>
                    <div class="description">${data.weather[0].description}</div>
                </div>
            </div>
            
            <div class="weather-details">
                <div class="detail-card">
                    <div class="detail-label">🌡️ Sensación térmica</div>
                    <div class="detail-value">${Math.round(data.main.feels_like)}°C</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-label">📉 Temp. mínima</div>
                    <div class="detail-value">${Math.round(data.main.temp_min)}°C</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-label">📈 Temp. máxima</div>
                    <div class="detail-value">${Math.round(data.main.temp_max)}°C</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-label">💨 Viento</div>
                    <div class="detail-value">${data.wind.speed} m/s</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-label">💧 Humedad</div>
                    <div class="detail-value">${data.main.humidity}%</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-label">🗜️ Presión</div>
                    <div class="detail-value">${data.main.pressure} hPa</div>
                </div>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = weatherHTML;
}