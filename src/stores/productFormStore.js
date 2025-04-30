import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

export const useProductFormStore = defineStore('productForm', () => {
    const form = reactive({
        productId: 'P' + Math.random().toString(36).substring(2, 9),
        productName: '',
        category: 'Electronics',
        customCategory: '',
        subCategory: 'Mobile',
        productType: '',
        brand: '',
        modelNumber: '',
        description: '',
        shortDescription: '',
        price: 0,
        currency: 'USD',
        discountType: 'None',
        discountValue: 0,
        taxCategory: 'Taxable',
        stock: 0,
        weight: 0,
        weightUnit: 'kg',
        length: 0,
        width: 0,
        height: 0,
        dimensionUnit: 'cm',
        colors: [],
        sizes: [],
        features: [],
        shipping: [],
        returnPolicy: '30 Days',
        warrantyPeriod: 0,
        productImages: [],
        seoKeywords: '',
        status: 'Draft',
        publicationDate: '',
        tags: []
    })

    const categories = [
        "Electronics",
        "Clothing",
        "Food & Beverages",
        "Home & Garden",
        "Beauty & Personal Care",
        "Other",
    ];

    const subCategories = {
        Electronics: ["Mobile", "Laptop", "Accessories"],
        Clothing: ["Tops", "Bottoms", "Footwear"],
        "Food & Beverages": ["Food", "Beverages"],
        "Home & Garden": ["Type1", "Type2","Type3"],
       "Beauty & Personal Care": ["Type1", "Type2"],
    };

    const productTypes = ["New", "Refurbished"];

    const currencies = ["USD", "INR", "EUR"];
    const discountTypes = ["None", "Percentage", "Fixed Amount"];
    const taxCategories = ["Taxable", "Exempt"];

    const colors = ["Red", "Blue", "Green", "Black", "White"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const sizeMap = {
        Tops: ["XS", "S", "M", "L", "XL", "XXL"],
        Bottoms: ["28", "30", "32", "34", "36", "38", "40"],
        Footwear: ["6", "7", "8", "9", "10", "11"]
    };

    const getSizeOptions = computed(() => {
        return sizeMap[form.subCategory] || [];
    });
    const dimensionUnits = ["cm", "inches"];

    const allShippingOptions = ["Standard", "Express", "Next Day", "International"];
    const filteredShippingOptions = computed(() => {
        return form.weight < 5
            ? allShippingOptions
            : allShippingOptions.filter(opt => opt !== "Next Day");
    });
    const returnPolicies = [
        "No Returns",
        "7 Days",
        "15 Days",
        "30 Days",
        "Exchange Only",
    ];

    return {
        form,
        categories,
        subCategories,
        productTypes,
        currencies,
        discountTypes,
        taxCategories,
        colors,
        sizes,
        dimensionUnits,
        getSizeOptions,
        filteredShippingOptions,
        returnPolicies
    }
})
