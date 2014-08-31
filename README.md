learn
=====

Raw thoughts

- Create a subclass of Prawn::Document
- Prawn does not provide a direct way to encapsulate collections if you
  have steps to build document for one type
- Its an attempt to have one way to make collections work
- Trick is to encapsulate the common pdf prawn steps in module
- Include it in both Single / Collection subclass of Prawn Document
- While iterating over collection, start the new page when you are done
  with one object pdf-prawn steps.
- Add_itionally, print method is just a JS snippet added into PDF using
  `add_docopen_js` and :JAVASCRIPT node in PDF::Document
