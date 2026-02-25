---
title: Fuwari Markdown 语法参考指南
published: 2026-02-25
description: ''
tags: [Markdown, Fuwari]
category: '代码相关'
draft: false
lang: 'zh-cn'
---

本文由ai撰写

## 基础语法 (Basic Syntax)

### 标题 (Headings)

使用 `#` 符号表示标题层级。

```markdown
# 一级标题 (H1)
## 二级标题 (H2)
### 三级标题 (H3)
#### 四级标题 (H4)
##### 五级标题 (H5)
###### 六级标题 (H6)
```

### 文本格式 (Text Formatting)

支持加粗、斜体、删除线和行内代码。

| 语法 | 代码示例 | 渲染效果 |
| :--- | :--- | :--- |
| **加粗** | `**Bold**` | **Bold** |
| *斜体* | `*Italic*` | *Italic* |
| ~~删除线~~ | `~~Strikethrough~~` | ~~Strikethrough~~ |
| `行内代码` | `` `Inline Code` `` | `Inline Code` |

### 列表 (Lists)

#### 无序列表

```markdown
- 项目 1
- 项目 2
  - 子项目 A
  - 子项目 B
```

**渲染效果：**

- 项目 1
- 项目 2
  - 子项目 A
  - 子项目 B

#### 有序列表

```markdown
1. 第一步
2. 第二步
3. 第三步
```

**渲染效果：**

1. 第一步
2. 第二步
3. 第三步

### 引用 (Blockquotes)

使用 `>` 符号进行引用，支持嵌套。

```markdown
> 这是一个引用块。
>
> > 这是一个嵌套的引用块。
```

**渲染效果：**
> 这是一个引用块。
>
> > 这是一个嵌套的引用块。

### 链接与图片 (Links & Images)

```markdown
[Fuwari GitHub](https://github.com/saicaca/fuwari)
![Fuwari Banner](https://raw.githubusercontent.com/saicaca/fuwari/main/public/og.png)
```

**渲染效果：**
[Fuwari GitHub](https://github.com/saicaca/fuwari)
![Fuwari Banner](https://raw.githubusercontent.com/saicaca/fuwari/main/public/og.png)

---

## 扩展语法 (Extended Syntax)

### 表格 (Tables)

使用 `|` 和 `-` 创建表格，支持对齐方式。

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
| :----- | :----: | -----: |
| 单元格 | 单元格 | 单元格 |
| 内容 A | 内容 B | 内容 C |
```

**渲染效果：**

| 左对齐 | 居中对齐 | 右对齐 |
| :----- | :----: | -----: |
| 单元格 | 单元格 | 单元格 |
| 内容 A | 内容 B | 内容 C |

### 任务列表 (Task Lists)

```markdown
- [x] 已完成任务
- [ ] 未完成任务
```

**渲染效果：**

- [x] 已完成任务
- [ ] 未完成任务

### 脚注 (Footnotes)

```markdown
这是一个带有脚注的句子[^1]。

[^1]: 这是脚注的内容。
```

**渲染效果：**
这是一个带有脚注的句子[^1]。

[^1]: 这是脚注的内容。

---

## 高级功能 (Advanced Features)

Fuwari 集成了许多强大的插件，提供更丰富的展示效果。

### 代码块增强 (Expressive Code)

支持语法高亮、文件名显示、行号及行高亮。

````markdown
```js title="example.js" {1, 3-4}
const greeting = "Hello";
console.log(greeting);
// 这一行被高亮
const add = (a, b) => a + b;
```
````

**渲染效果：**

```js title="example.js" {1, 3-4}
const greeting = "Hello";
console.log(greeting);
// 这一行被高亮
const add = (a, b) => a + b;
```

### 数学公式 (Math)

支持 LaTeX 数学公式渲染（基于 Katex）。

**行内公式：** `$E = mc^2$`

**块级公式：**

```markdown
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

**渲染效果：**

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 提示块 (Admonitions)

支持 GitHub 风格的警告块和自定义指令。

#### GitHub 风格

```markdown
> [!NOTE]
> 这是一个包含有用信息的提示块。

> [!WARNING]
> 这是一个警告块，请注意。
```

**渲染效果：**

> [!NOTE]
> 这是一个包含有用信息的提示块。

> [!WARNING]
> 这是一个警告块，请注意。

#### 指令风格 (Directives)

支持 `note`, `tip`, `warning` 等类型。

```markdown
:::tip[小技巧]
这是使用 `:::` 指令创建的提示块，可以自定义标题。
:::


**渲染效果：**

:::tip[小技巧]
这是使用 `:::` 指令创建的提示块，可以自定义标题。
:::

### GitHub 仓库卡片

展示 GitHub 仓库信息的卡片组件。

```markdown
::github{repo="saicaca/fuwari"}
```

**渲染效果：**

::github{repo="saicaca/fuwari"}

### 折叠详情 (Details)

使用 HTML `<details>` 标签创建可折叠内容。

```html
<details>
<summary>点击展开查看更多</summary>

这里是隐藏的详细内容。
可以包含 **Markdown** 格式。
</details>
```

**渲染效果：**

<details>
<summary>点击展开查看更多</summary>

这里是隐藏的详细内容。
可以包含 **Markdown** 格式。
</details>

---

希望这份指南能帮助你更好地使用 Fuwari 撰写博客！
