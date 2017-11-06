package books_test

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	// . "realbull/books"
	// "errors"
	// "fmt"
	// "strconv"
	// "time"
)

var i = 1

func DoSomething(c chan string) {
	// c <- ("Done！ :" + strconv.Itoa(i))
	// time.Sleep(5)
	c <- "Done!"
	i++
}

var _ = Describe("abc", func() {
	// It("should post to the channel, eventually", func() {
	// 	c := make(chan string, 0)

	// 	go DoSomething(c)
	// 	Expect(<-c).To(ContainSubstring("Done!"))
	// })

	It("should post to the channel, eventually", func(done Done) {
		c := make(chan string, 0)

		go DoSomething(c)
		Expect(<-c).To(ContainSubstring("Done!"))
		close(done)
	}, 0.0001)
})
