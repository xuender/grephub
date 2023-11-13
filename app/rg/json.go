// nolint
package rg

type Line struct {
	Type string `json:"type"`
	Data Data   `json:"data"`
}

type Data struct {
	Path           Text       `json:"path"`
	Lines          Text       `json:"lines"`
	LineNumber     int64      `json:"line_number"`
	AbsoluteOffset int64      `json:"absolute_offset"`
	Submatches     []Submatch `json:"submatches"`
	Stats          Stats      `json:"stats"`
}

type Text struct {
	Text string `json:"text"`
}

type Submatch struct {
	Match Text  `json:"match"`
	Start int64 `json:"start"`
	End   int64 `json:"end"`
}

type Stats struct {
	Elapsed           Elapsed `json:"elapsed"`
	Searches          int64   `json:"searches"`
	SearchesWithMatch int64   `json:"searches_with_match"`
	BytesSearched     int64   `json:"bytes_searched"`
	BytesPrinted      int64   `json:"bytes_printed"`
	MatchedLines      int64   `json:"matched_lines"`
	Matches           int64   `json:"matches"`
}

type Elapsed struct {
	Secs  int64  `json:"secs"`
	Nanos int64  `json:"nanos"`
	Human string `json:"human"`
}
