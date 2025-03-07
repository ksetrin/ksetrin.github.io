---
title: "Практические задачи из собеседований Frontend разработчика"
description: "Подборка алгоритмических задач по JavaScript и React, которые я часто даю и получаю на технических собеседованиях"
category: "Coding"
tags: ["javascript", "interview", "react", "redux"]
slug: "interview-practice"
lang: "ru"
datePublished: "2023-09-20"
dateModified: "2024-01-05"
author: "Пётр Евсиков"
tldr: ["Тренируемся решать задачи на массивы и строки без библиотек", "Оттачиваем алгоритмическое мышление перед интервью", "Используем примеры решений в стиле собеседований"]
---
### K наиболее частых элементов

Напишите функцию, которая принимает массив целых чисел nums и целое число k, и возвращает массив из k наиболее часто встречающихся элементов.  

Условия:  
Если k больше количества уникальных элементов в массиве, вернуть все уникальные элементы.  
Примеры:
```
Input 1: [1, 1, 1, 2, 2, 3], 2
Output 1: [1, 2]
Input 2: [1, 2, 3, 4, 5], 2
Output 2: [1, 2]
```

Решение
```javascript
function arrOfK(nums, k) {
  // Считаем частоты элементов
  const freq = {};
  for (let n of nums) freq[n] = (freq[n] || 0) + 1;
  // Сортируем по убыванию частоты и возвращаем k первых
  return Object.keys(freq)
    .sort((a, b) => freq[b] - freq[a])
    .slice(0, k)
    .map(Number);
}
```

### Группировка анаграмм

Напишите функцию groupAnagrams(arr), которая принимает массив строк arr и группирует анаграммы вместе. Условия:
Анаграмма — это слово или фраза, образованные путем перестановки букв другого слова или фразы (например, "tea" => "eat").
Примеры:
```
Input 1: ["ab", "ba", "abc", "bca"]
Output 1: [["abc","bca"],["ab","ba"]]
Input 2: ["listen", "silent", "enlist"]
Output 2: [["listen","silent","enlist"]]
```

Решение
```javascript
function groupAnagrams(arr) {
    const groups = {};
    
    for (const str of arr) {
        // Создаем ключ: отсортированные буквы строки
        const key = str.split('').sort().join('');
        
        // Группируем строки по ключу
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(str);
    }
    
    // Возвращаем массив групп
    return Object.values(groups);
}
```

### Извлечение нод по типу

Дана древовидная структура следующего формата:
```javascript
const tree = {
  type: "nested",
  children: [
    { type: "added", value: 42 },
    {
      type: "nested",
      children: [{ type: "added", value: 43 }],
    },
    { type: "added", value: 44 },
  ],
};
```
Необходимо написать функцию getNodes(tree, type), которая возвращает все ноды в порядке следования, соответствующие переданному типу. Глубина вложенности любая.  
Примеры:
```
Input 1: 
  {
    "type": "nested",
    "children": [
      { "type": "added", "value": 42 },
      {
        "type": "nested",
        "children": [
          { "type": "added", "value": 43 }
        ]
      },
      { "type": "added", "value": 44 }
    ]
  }
Output 1: 
  [
    { "type": "added", "value": 42 },
    { "type": "added", "value": 43 },
    { "type": "added", "value": 44 }
  ]

Input 2: 
  {
    "type": "nested",
    "children": [
      { "type": "nested", "children": [
        { "type": "added", "value": 50 }
      ] },
      { "type": "added", "value": 51 }
    ]
  }
Output 2: 
  [
    { "type": "added", "value": 50 },
    { "type": "added", "value": 51 }
  ]

Input 3: 
  {
    "type": "nested",
    "children": [
      { "type": "nested", "children": [
        { "type": "nested", "children": [
          { "type": "added", "value": 60 }
        ] }
      ] }
    ]
  }
Output 3: 
  [
    { "type": "added", "value": 60 }
  ]
```

Решение без рекурсии
```javascript
function getNodes(tree, type) {
    const result = [];
    const stack = [tree];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        // Проверяем текущую ноду
        if (node.type === type) {
            result.push(node);
        }
        
        // Добавляем детей в стек в обратном порядке 
        // (чтобы сохранить правильный порядок обхода)
        if (node.children) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
    }
    
    return result;
}
```

Решение с рекурсией
```javascript
function getNodes(tree, type) {
    // Массив для хранения найденных нод
    let result = [];
  
    // Проверяем, соответствует ли тип текущей ноды заданному типу
    if (tree.type === type) {
      // Если соответствует, добавляем копию ноды в результат (Копирование нужно, чтобы не
      // модифицировать исходное дерево, если дети будут удалены ниже)
      result.push({ ...tree }); 
    }
  
    // Проверяем, есть ли у текущей ноды дочерние элементы
    if (tree.children && tree.children.length > 0) {
      // Рекурсивно вызываем getNodes для каждого дочернего элемента
      for (const child of tree.children) {
        // Соединяем результаты, полученные от дочерних вызовов, с текущим результатом
        result = result.concat(getNodes(child, type));
      }
    }
  
    // Возвращаем массив найденных нод
    return result;
  }
```

### Рекурсивная сумма всех чисел в объекте
Напишите функцию, которая принимает объект и рекурсивно вычисляет сумму всех чисел, находящихся внутри него.  
Если объект содержит вложенные объекты, необходимо рекурсивно проходить по ним.  
Если внутри объекта есть нечисловые значения, их игнорировать.  
Примеры:
```
Input 1: {
          x: 5,
          y: {
            z: 7,
            w: {
              v: -3,
            },
          },
        }
Output 1: 9
Input 2: {
          a: "text",
          b: {
            c: true,
            d: null,
            e: 5,
          },
        }
Output 2: 5
```

Решение
```javascript
function recursiveSum(obj) {
  let sum = 0;
  for (let key in obj) {
    const val = obj[key];
    if (typeof val === 'number') {
      sum += val;
    } else if (val && typeof val === 'object') {
      sum += recursiveSum(val);
    }
  }
  return sum;
}
```
