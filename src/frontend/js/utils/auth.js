export const decodeJWT = (token) => {
    if (!token) return null;
    try {
        const base64Url = token.split(".")[1]; // Extraemos el payload
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Normalizamos Base64

        // Decodificar Base64 de forma segura
        const binaryString = window.atob(base64);
        const bytes = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));

        // Decodificar JSON
        const jsonPayload = new TextDecoder().decode(bytes);

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

// Función para decodificar Base64 sin usar `atob()`
const atobFix = (base64) => {
    const binaryString = window
        .atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0));
    return new Uint8Array(binaryString);
};