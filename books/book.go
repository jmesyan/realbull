package books

import (
	"fmt"
	"strings"
)

type Book struct {
	Title  string
	Author string
	Pages  int
}

func (b *Book) CategoryByLength() string {
	return "NOVEL"
}

func (b *Book) AuthorLastName() string {
	aa := strings.Split(b.Author, " ")
	return aa[1]
}

func DoSomething() bool {
	fmt.Println("let us dosomething")
	return false
}
