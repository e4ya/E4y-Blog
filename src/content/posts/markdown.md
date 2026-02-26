---
title: Markdown 语法参考
published: 2026-02-25
description: '《Nina教你Markdown语法！三分钟极速入门！》视频的配套文稿'
tags: [Markdown]
category: '代码相关'
draft: false
lang: 'zh-cn'
---

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=1355547339&bvid=BV1Ez421b7tg&cid=1580658073&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="500"></iframe>

### 要点提醒

输入标记符号时，请使用半角符号（英文符号）并注意空格的使用，否则可能导致格式错误。

### 标题（Headers）

使用 `#` 符号来创建标题，符号的数量决定标题的级别。

```markdown
# 长崎素世（一级标题）
## 高松灯（二级标题）
### 椎名立希（三级标题）
#### 千早爱音（四级标题）
##### 椎名立希（五级标题）
###### ANON TOKYO（六级标题）
```

### 样式（Style）

```markdown
*斜体*
**粗体**
***粗斜体***
删除线 ： ~~CRYCHIC~~
```

*斜体*
**粗体**
***粗斜体***
删除线 ： ~~CRYCHIC~~

不在 Markdown 涵盖范围之内的标签，
都可以直接在文档里面用 HTML 撰写

例如：

```html
<u>带下划线文本</u>
<em>斜体文本</em>
<strong>加粗文本</strong>
<b>加粗文本2</b>
<del>软弱的我</del>
<kbd>Ctrl</kbd>+<kbd>C</kbd>
上标<sup>上标</sup>
下标<sub>下标</sub>
```

<u>带下划线文本</u>
<em>斜体文本</em>
<strong>加粗文本</strong>
<b>加粗文本2</b>
<del>软弱的我</del>
<kbd>Ctrl</kbd>+<kbd>C</kbd>
上标<sup>上标</sup>
下标<sub>下标</sub>

### 注脚（Footnotes）

创建注脚。

```markdown
丰川祥子[^1]。

[^1]: 隶属于ave mujica的键盘手。
```

丰川祥子[^1]。

[^1]: 隶属于ave mujica的键盘手。

### 转义符号（Escape Characters）

Markdown 使用反斜杠`\`来转义特殊字符。

以下符号需要转义：

```text
\\   反斜线
\`   反引号
\*   星号
\_   下划线
\{\}  花括号
\[\]  方括号
\(\)  小括号
\#   井字号
\+   加号
\-   减号
\.   英文句点
\!   感叹号
```

\\   反斜线
\`   反引号
\*   星号
\_   下划线
\{\}  花括号
\[\]  方括号
\(\)  小括号
\#   井字号
\+   加号
\-   减号
\.   英文句点
\!   感叹号

### 列表（Lists）

分为无序列表和有序列表。

无序列表使用星号(*)、加号(+)或是减号(-)作为列表标记，
这些标记后面要添加一个空格，然后再填写内容。

有序列表使用数字并加上句点(.)作为列表标记，
这些标记后面要添加一个空格，然后再填写内容。

```markdown
- Girl band party（无序列表项）
  - 有尖无刺（嵌套无须序列表项）
  - 钻石星辰（嵌套无须序列表项）

1. BangDream（有序列表项）
     1. MyGO（嵌套有须序列表项）
     2. AveMujica（嵌套有须序列表项）
```

- Girl band party（无序列表项）
  - 有尖无刺（嵌套无须序列表项）
  - 钻石星辰（嵌套无须序列表项）

1. BangDream（有序列表项）
     1. MyGO（嵌套有须序列表项）
     2. AveMujica（嵌套有须序列表项）

### 表格（Tables）

:- 将表头及单元格内容左对齐
:-: 将表头及单元格内容居中
-: 将表头及单元格内容右对齐

```markdown
| 姓名   |   乐队位置    |  年龄 |
| :--- | :-------: | --: |
| 27   | 主唱（节奏吉他？） |  17 |
| mmk  |   主音吉他    |  20 |
| 486  |    鼓手     |  17 |
| tomo |    键盘     |  16 |
| rupa |    贝斯     |  22 |
```

| 姓名   |   乐队位置    |  年龄 |
| :--- | :-------: | --: |
| 27   | 主唱（节奏吉他？） |  17 |
| mmk  |   主音吉他    |  20 |
| 486  |    鼓手     |  17 |
| tomo |    键盘     |  16 |
| rupa |    贝斯     |  22 |

### 链接和图像（Links and Images）

插入链接和图像。

```markdown
[描述](链接)
例如: [MyGO_AveMujica](https://space.bilibili.com/1459104794)

![描述](https://s2.loli.net/2024/06/13/5xyGzfcakNHArV2.jpg)
例如: ![anon酱](https://s2.loli.net/2024/06/13/5xyGzfcakNHArV2.jpg)

```

例如: [MyGO_AveMujica](https://space.bilibili.com/1459104794)
![anon酱](https://s2.loli.net/2024/06/13/5xyGzfcakNHArV2.jpg)
### 分割线（Horizontal Rules）

创建分割线。

```markdown
***
* * *
*****
---
- - -
----------
```

***
* * *
*****
---
- - -
----------

### 代码（Code）

行内代码和代码块。

行内代码使用反引号(`)包围。

行内代码示例：

```markdown
`print()` 函数
```

 `print()` 函数

代码块可以指定语法高亮。

````markdown
```python
这是代码块示例。
print("Hello, World!")
```
````

```python
这是代码块示例。
print("Hello, World!")
```

### 数学公式（Math）

使用美元符号包围数学公式。

行内公式：

```markdown
这是一个行内公式：$1+1=3$。
```

这是一个行内公式：$1+1=3$。

块级公式：

```markdown
$$
\because 6－6＝9－9 \\
3×2－3×2＝3×3－3×3 \\
2（3－3）＝3（3－3） \\
\therefore 2=3 \\
又\because 1+1＝2 \\
\therefore 1+1=3
$$
```

$$
\because 6－6＝9－9 \\
3×2－3×2＝3×3－3×3 \\
2（3－3）＝3（3－3） \\
\therefore 2=3 \\
又\because 1+1＝2 \\
\therefore 1+1=3
$$

### 引用（Blockquotes）

创建引用块。

```markdown
>这是一个引用块。
>>这是一个一级嵌套引用块
>>>这是一个二级嵌套引用块
```

>这是一个引用块。
>>这是一个一级嵌套引用块
>>>这是一个二级嵌套引用块
