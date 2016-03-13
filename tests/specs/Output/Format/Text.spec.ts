describe('Text format', createFormatTests(
    Pricker.Output.Format.Text,
    [
        ['startLine', ''],
        ['endLine', '\n'],
        ['newColumn', '  '],
    ],
    [
        [Pricker.Call.Plain, 0, ' '],
        [Pricker.Call.Bob, 0, '-'],
        [Pricker.Call.Single, 0, 's'],
    ]
));
