// src/components/TldSelection.tsx

'use client';

import { ALL_TLDS, COMMON_TLDS, COUNTRY_TLDS, NEW_TLDS, TLD_CATEGORIES } from '@/utils/tlds';

export type TLDListType = 'popular' | 'common' | 'country' | 'new' | 'all' | 'custom';

interface TldSelectionProps {
    tldOption: TLDListType;
    getCustomTlds: () => string[];
    setTldOption: (option: TLDListType) => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    isChecking: boolean;
    popularTlds: string[];
}

export default function TldSelection({
    tldOption,
    getCustomTlds,
    setTldOption,
    selectedCategories,
    setSelectedCategories,
    isChecking,
    popularTlds
}: TldSelectionProps) {
    const getTldCount = (option: TLDListType) => {
        switch (option) {
            case 'popular':
                return popularTlds.length;
            case 'common':
                return COMMON_TLDS.length;
            case 'country':
                return COUNTRY_TLDS.length;
            case 'new':
                return NEW_TLDS.length;
            case 'all':
                return ALL_TLDS.length;
            case 'custom':
                return getCustomTlds().length;
        }
    };

    const getTldOptionDisplayName = (option: TLDListType) => {
        const count = getTldCount(option);
        return `${option.charAt(0).toUpperCase() + option.slice(1)} (${count})`;
    };

    const getTldOptionDescription = (option: TLDListType) => {
        switch (option) {
            case 'popular':
                return 'Top most used TLDs';
            case 'common':
                return 'Common and widely used';
            case 'country':
                return 'Country-specific';
            case 'new':
                return 'Modern and innovative';
            case 'all':
                return 'Complete list of all TLDs';
            case 'custom':
                return 'Custom selection';
        }
    };

    const getOptionIcon = (option: TLDListType) => {
        switch (option) {
            case 'popular':
                return 'icon-[icon-park-outline--fire]';
            case 'common':
                return 'icon-[icon-park-outline--star]';
            case 'country':
                return 'icon-[icon-park-outline--earth]';
            case 'new':
                return 'icon-[icon-park-outline--rocket]';
            case 'all':
                return 'icon-[icon-park-outline--all-application]';
            case 'custom':
                return 'icon-[icon-park-outline--setting]';
        }
    };

    const getOptionColor = (option: TLDListType) => {
        switch (option) {
            case 'popular':
                return 'from-red-600 to-red-700';
            case 'common':
                return 'from-emerald-600 to-emerald-700';
            case 'country':
                return 'from-sky-600 to-sky-700';
            case 'new':
                return 'from-purple-600 to-purple-700';
            case 'all':
                return 'from-stone-600 to-stone-800';
            case 'custom':
                return 'from-yellow-600 to-yellow-700';
        }
    };

    const customTldsCount = getCustomTlds().length;

    return (
        <div className="mb-8 pb-8 border-b border-stone-800">
            <h3 className="text-xl font-bold text-stone-200 mb-6 flex items-center gap-3">
                <span className="icon-[icon-park-outline--category-management] text-emerald-400 w-5 h-5"></span>
                Select TLD Categories
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(['popular', 'common', 'country', 'new', 'all', 'custom'] as TLDListType[]).map((option) => {
                    const isSelected = tldOption === option;
                    const icon = getOptionIcon(option);
                    const gradient = getOptionColor(option);

                    return (
                        <label
                            key={option}
                            className={`relative flex flex-col items-center justify-center p-5 rounded-xl cursor-pointer transition-all duration-300 border-2 h-full ${
                                isSelected
                                    ? 'border-emerald-500 bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 shadow-lg shadow-emerald-500/10'
                                    : 'border-stone-700 bg-stone-900 hover:border-stone-600 hover:shadow-md'
                            }`}
                        >
                            <input
                                type="radio"
                                name="tldOption"
                                value={option}
                                checked={isSelected}
                                onChange={(e) => {
                                    setTldOption(e.target.value as TLDListType);
                                }}
                                className="sr-only"
                                disabled={isChecking}
                            />

                            <div className="flex flex-col items-center text-center space-y-3">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                        isSelected ? 'bg-gradient-to-br ' + gradient : 'bg-stone-800'
                                    }`}
                                >
                                    <span
                                        className={`${icon} ${isSelected ? 'text-stone-100' : 'text-stone-500'} w-6 h-6`}
                                    ></span>
                                </div>

                                <div>
                                    <div className="font-bold text-stone-200 mb-1">{getTldOptionDisplayName(option)}</div>
                                    <div className="text-sm text-stone-400">{getTldOptionDescription(option)}</div>
                                </div>
                            </div>

                            {isSelected && (
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md">
                                    <span className="icon-[icon-park-outline--check-one] text-stone-100 w-4 h-4"></span>
                                </div>
                            )}
                        </label>
                    );
                })}
            </div>

            {tldOption === 'custom' && (
                <div className="mt-8 p-6 bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 border border-emerald-800/50 rounded-xl shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <div>
                            <h4 className="font-bold text-stone-200 text-lg mb-1">Custom Category Selection</h4>
                            <p className="text-sm text-stone-400">Select specific TLD categories to check</p>
                        </div>
                        <div className="px-4 py-2 bg-stone-900 rounded-lg border border-emerald-800/50 shadow-sm">
                            <span className="font-bold text-emerald-400">{customTldsCount}</span>
                            <span className="text-stone-400 text-sm"> TLDs selected from </span>
                            <span className="font-bold text-emerald-400">{selectedCategories.length}</span>
                            <span className="text-stone-400 text-sm"> categories</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2">
                        {Object.keys(TLD_CATEGORIES).map((category) => {
                            const isSelected = selectedCategories.includes(category);
                            const tldCount = TLD_CATEGORIES[category as keyof typeof TLD_CATEGORIES].length;

                            return (
                                <label
                                    key={category}
                                    className={`flex items-center gap-5 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                        isSelected
                                            ? 'bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 border border-emerald-700/50 shadow-sm'
                                            : 'bg-stone-900 hover:bg-stone-800 border border-stone-700'
                                    }`}
                                >
                                    <div
                                        className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                                            isSelected
                                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-500'
                                                : 'border-stone-600'
                                        }`}
                                    >
                                        {isSelected && (
                                            <span className="icon-[icon-park-outline--check-one] text-stone-100 w-3 h-3"></span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-stone-300 truncate">
                                            {category.toLowerCase().replace(/_/g, ' ')}
                                        </div>
                                        <div className="text-xs text-stone-500 flex items-center gap-1">{tldCount} TLDs</div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedCategories([...selectedCategories, category]);
                                            } else {
                                                setSelectedCategories(selectedCategories.filter((c) => c !== category));
                                            }
                                        }}
                                        className="sr-only"
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 justify-between">
                        <button
                            onClick={() => {
                                setSelectedCategories(Object.keys(TLD_CATEGORIES));
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-stone-100 hover:from-emerald-700 hover:to-emerald-800 rounded-lg font-medium cursor-pointer transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2 border border-emerald-800"
                        >
                            <span className="icon-[icon-park-outline--check-correct] w-4 h-4"></span>
                            Select All
                        </button>
                        <button
                            onClick={() => {
                                setSelectedCategories([]);
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-stone-800 to-stone-900 text-stone-400 hover:from-stone-700 hover:to-stone-800 rounded-lg font-medium cursor-pointer transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2 border border-stone-700"
                        >
                            <span className="icon-[icon-park-outline--clear] w-4 h-4"></span>
                            Clear All
                        </button>
                    </div>

                    {selectedCategories.length === 0 && (
                        <div className="mt-4 p-3 bg-gradient-to-r from-amber-900/20 to-amber-800/20 border border-amber-800/50 rounded-lg flex items-center gap-3">
                            <span className="icon-[icon-park-outline--attention] text-amber-400 w-5 h-5"></span>
                            <div>
                                <div className="font-medium text-amber-300">No categories selected</div>
                                <div className="text-sm text-amber-200">
                                    Please select at least one category to check domains
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
