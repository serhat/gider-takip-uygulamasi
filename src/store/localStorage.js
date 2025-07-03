// Bu fonksiyon, state'i Local Storage'dan yüklemeyi dener.
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            // Local Storage'da state yoksa, undefined döndürerek
            // reducer'ların başlangıç state'ini kullanmasını sağlarız.
            return undefined;
        }
        // JSON formatındaki string'i objeye çevirip döndürür.
        return JSON.parse(serializedState);
    } catch (err) {
        // Hata olursa (örneğin kullanıcının gizlilik ayarları engelliyorsa)
        // yine undefined döndürürüz.
        console.error("Local Storage'dan state yüklenemedi", err);
        return undefined;
    }
};

// Bu fonksiyon, mevcut state'i Local Storage'a kaydeder.
export const saveState = (state) => {
    try {
        // JavaScript objesini JSON formatında bir string'e çeviririz.
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Hata olursa konsola yazdırırız.
        console.error("State Local Storage'a kaydedilemedi", err);
    }
};