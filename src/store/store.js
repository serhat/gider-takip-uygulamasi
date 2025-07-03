import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';
// localStorage.js dosyasından fonksiyonlarımızı import ediyoruz.
import { loadState, saveState } from './localStorage';

// Uygulama ilk yüklendiğinde Local Storage'dan state'i çekiyoruz.
const persistedState = loadState();

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
    },
    // `preloadedState`, store'un başlangıç state'ini belirler.
    // Eğer Local Storage'dan gelen veri varsa, onu kullanır.
    preloadedState: persistedState,
});

// Store'daki her değişiklikten sonra abone (subscribe) oluyoruz.
// Bu fonksiyon, state her güncellendiğinde çalışır.
store.subscribe(() => {
    // Store'un mevcut state'ini alıp Local Storage'a kaydediyoruz.
    saveState({
        transactions: store.getState().transactions,
    });
});