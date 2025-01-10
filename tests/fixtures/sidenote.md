Creates a standard side-note
.
Edward Tufte popularized moving footnotes[^1] into the margin next to the relevant text.

[^1]: Comments and asides that are tangential to the flow of the primary document.

Here is an entirely separate paragraph.
.
<p>Edward Tufte popularized moving footnotes<label for="sn-1" class="margin-toggle sidenote-number"></label><input id="sn-1" type="checkbox" class="margin-toggle"><span class="sidenote">Comments and asides that are tangential to the flow of the primary document.</span> into the margin next to the relevant text.</p>
<p>Here is an entirely separate paragraph.</p>
.

Creates an inline side-note
.
Edward Tufte popularized moving footnotes^[a.k.a. tangential comments] into the margin next to the relevant text.

Here is an entirely separate paragraph.
.
<p>Edward Tufte popularized moving footnotes<label for="sn-0" class="margin-toggle sidenote-number"></label><input id="sn-0" type="checkbox" class="margin-toggle"><span class="sidenote">a.k.a. tangential comments</span> into the margin next to the relevant text.</p>
<p>Here is an entirely separate paragraph.</p>
.

Multiple paragraphs are converted into line breaks
.
Edward Tufte popularized moving footnotes[^1] into the margin next to the relevant text.

[^1]: Comments and asides

    that are tangential to the flow

    of the primary document.

Here is an entirely separate paragraph.
.
<p>Edward Tufte popularized moving footnotes<label for="sn-1" class="margin-toggle sidenote-number"></label><input id="sn-1" type="checkbox" class="margin-toggle"><span class="sidenote">Comments and asides<br>
that are tangential to the flow<br>
of the primary document.</span> into the margin next to the relevant text.</p>
<p>Here is an entirely separate paragraph.</p>
.

Creates a standard margin-note
.
Edward Tufte popularized moving footnotes[^1] into the margin next to the relevant text.

[^1]:

    {-} Comments and asides that are tangential to the flow of the primary document.

Here is an entirely separate paragraph. The {-} syntax is used to make a margin note.
.
<p>Edward Tufte popularized moving footnotes<label for="mn-1" class="margin-toggle">&#8853;</label><input id="mn-1" type="checkbox" class="margin-toggle"><span class="marginnote">Comments and asides that are tangential to the flow of the primary document.</span> into the margin next to the relevant text.</p>
<p>Here is an entirely separate paragraph. The {-} syntax is used to make a margin note.</p>
.

Creates an inline margin-note
.
Edward Tufte popularized moving footnotes^[   {-} a.k.a. tangential comments  ] into the margin next to the relevant text.

Here is an entirely separate paragraph.
.
<p>Edward Tufte popularized moving footnotes<label for="mn-0" class="margin-toggle">&#8853;</label><input id="mn-0" type="checkbox" class="margin-toggle"><span class="marginnote">a.k.a. tangential comments</span> into the margin next to the relevant text.</p>
<p>Here is an entirely separate paragraph.</p>
.
