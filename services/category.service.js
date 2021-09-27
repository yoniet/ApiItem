const Category = require('../modules/category.module');

class CategoryService {
    static instance = null;

    _categories = [];

    static getInstance() {
        if(CategoryService.instance) {
            return CategoryService.instance;
        }
        CategoryService.instance = new CategoryService();
        return CategoryService.instance;
    }

    getSingleCategory(id) {
        return  this._categories[id];
    }

    setCategories(dataCategory) {
        this._categories = dataCategory;
    }

    getSize() {
        return this._categories.length;
    }

    getCategories() {
        return this._categories;
    }

    createCategory(id, numberCategory, name) {
        const newCategory = new Category(id, numberCategory, name);
        this._categories.push(newCategory);
    }

    deleteCategory(Number) {
        this._categories.splice(Number, 1);
    } 

    updateCategory(num, newCategory) {
        const category = this._categories.find((cate)=> {
            return cate.id === num;
        });
        Object.assign(category, newCategory);
    }
}

module.exports = CategoryService;