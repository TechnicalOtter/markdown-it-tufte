Image without caption
.
Paragraph before

![alt text](/image.png)

Paragraph after
.
<section>
<p>Paragraph before</p>
<figure><img src="/image.png" alt="alt text"></figure>
<p>Paragraph after</p>
</section>
.

Leaves images inside other blocks alone
.
Paragraph before

> ![alt text](/image.png)

Paragraph after
.
<section>
<p>Paragraph before</p>
<blockquote>
<p><img src="/image.png" alt="alt text"></p>
</blockquote>
<p>Paragraph after</p>
</section>
.

Leaves images elsewhere in a paragraph alone
.
Paragraph before

Text ![alt text](/image.png) and more

Paragraph after
.
<section>
<p>Paragraph before</p>
<p>Text <img src="/image.png" alt="alt text"> and more</p>
<p>Paragraph after</p>
</section>
.
