
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('eye-image');
    const file = fileInput.files[0];
    
    if (!file) {
        alert("Please upload an image of your eye.");
        return;
    }
    
    const formData = new FormData();
    formData.append('eye-image', file);
    
    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.status === 'infected') {
            document.getElementById('result').innerHTML = `<h3>Result: Infected</h3><p>Signs of retinopathy detected. Please consult a specialist.</p>`;
        } else if (result.status === 'healthy') {
            document.getElementById('result').innerHTML = `<h3>Result: Healthy</h3><p>No signs of retinopathy detected.</p>`;
        } else {
            document.getElementById('result').innerHTML = `<h3>Result: Unknown</h3><p>Unable to determine. Please try again.</p>`;
        }
        
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('result').innerHTML = `<h3>Error</h3><p>Unable to process the image. Please try again later.</p>`;
    }
});
