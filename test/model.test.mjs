import test from 'node:test';
import assert from 'node:assert/strict';
import {newDeck,canvasHtml,textElement} from '../docs/model.js';
test('a new presentation has independent identifiers',()=>{const a=newDeck(),b=newDeck();assert.notEqual(a.slides[0].id,b.slides[0].id);assert.notEqual(a.slides[0].elements[0].id,b.slides[0].elements[0].id);});
test('untrusted slide text is rendered as text, never HTML',()=>{const html=canvasHtml({elements:[textElement('<img src=x onerror=alert(1)>')]});assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img'));});
test('styles are bounded and colour/align values cannot inject CSS',()=>{const html=canvasHtml({elements:[{...textElement('Test'),x:500,size:100000,color:'red;position:fixed',align:'left;display:none'}]});assert.ok(html.includes('left:99%'));assert.ok(!html.includes('position:fixed'));assert.ok(!html.includes('display:none'));});
