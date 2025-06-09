
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ProductCard from '@/components/ProductCard';
import { products, categories, materials } from '@/data/products';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Фильтры
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Инициализация фильтров из URL
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) {
      setSelectedCategories([category]);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по категориям
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Фильтр по материалам
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product =>
        selectedMaterials.includes(product.material)
      );
    }

    // Фильтр по цене
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => {
        const min = priceRange.min ? parseInt(priceRange.min) : 0;
        const max = priceRange.max ? parseInt(priceRange.max) : Infinity;
        return product.price >= min && product.price <= max;
      });
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Оставляем исходный порядок
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, selectedMaterials, priceRange, sortBy, searchQuery]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials(prev => [...prev, material]);
    } else {
      setSelectedMaterials(prev => prev.filter(m => m !== material));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setPriceRange({ min: '', max: '' });
    setSortBy('default');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Фильтры */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Фильтры</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Сбросить
                </Button>
              </div>

              {/* Поиск */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Поиск</Label>
                <Input
                  placeholder="Найти товар..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Категории */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Категории</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => 
                          handleCategoryChange(category, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`category-${category}`} 
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Материалы */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Материал</Label>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`material-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onCheckedChange={(checked) => 
                          handleMaterialChange(material, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`material-${material}`} 
                        className="text-sm cursor-pointer"
                      >
                        {material}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Цена */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Цена (₽)</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="От"
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  />
                  <Input
                    placeholder="До"
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Основной контент */}
          <main className="flex-1">
            {/* Заголовок и сортировка */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold mb-4 sm:mb-0">
                Каталог украшений
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredProducts.length} товаров)
                </span>
              </h1>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">По умолчанию</SelectItem>
                  <SelectItem value="price-asc">Цена по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена по убыванию</SelectItem>
                  <SelectItem value="name-asc">Название А-Я</SelectItem>
                  <SelectItem value="name-desc">Название Я-А</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Сетка товаров */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  Товары не найдены
                </p>
                <Button onClick={clearFilters}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
