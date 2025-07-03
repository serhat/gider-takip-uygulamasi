import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    islemler: [
        { id: 1, aciklama: 'Maaş', miktar: 5000 },
        { id: 2, aciklama: 'Kira', miktar: -1500 },
        { id: 3, aciklama: 'Fatura', miktar: -400 },
        { id: 4, aciklama: 'Kitap', miktar: -100 }
    ]
};

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        // islemEkle: State'i alıp, action ile gelen veriyi (payload) kullanarak state'i günceller.
        islemEkle: (state, action) => {
            // Redux Toolkit sayesinde state'i doğrudan "değiştiriyormuş" gibi yazabiliriz.
            // Arka planda kopyalama işlemini (immutability) kendisi halleder.
            state.islemler.unshift(action.payload);
        },
        // islemSil: State'i ve silinecek ID'yi (action.payload) alarak state'i günceller.
        islemSil: (state, action) => {
            state.islemler = state.islemler.filter(
                islem => islem.id !== action.payload
            );
        },
    },
});

// Action'larımızı bileşenlerde kullanmak için export ediyoruz.
export const { islemEkle, islemSil } = transactionSlice.actions;

// Store'da kullanmak için reducer'ı export ediyoruz.
export default transactionSlice.reducer;