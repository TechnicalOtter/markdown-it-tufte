Creates a standard side-note
.
Edward Tufte popularized moving footnotes[^1] into the margin next to the relevant text.

[^1]: Comments and asides that are tangential to the flow of the primary document.

Here is an entirely separate paragraph.
.
<p>Edward Tufte popularized moving footnotes<label for="sn-1" class="margin-toggle sidenote-number"></label><input id="sn-1" type="checkbox" class="margin-toggle"><span class="sidenote">Comments and asides that are tangential to the flow of the primary document.</span> into the margin next to the relevant text.</p>
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
