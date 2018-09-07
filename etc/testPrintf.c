#include <stdio.h>
#include <string.h>

int main(void) {
    int space;
    char *str;

    space = 40;
    str = "hello, world!";

    printf("%*s\n", (int) (space / 2 + strlen(str) / 2), str);

    return 0;
}
