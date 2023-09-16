import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookDto } from './book.model';
import { BookService } from './book.service';
import { Book } from './book.schema';

@Controller('api/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAll(): Promise<Book[]> {
    return await this.bookService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Book> {
    const book = await this.bookService.findById(id);
    if (!book) throw new NotFoundException();
    return book;
  }

  @Post()
  async createBook(@Body() book: BookDto): Promise<Book> {
    const createdBook = await this.bookService.createdBook(book);
    return createdBook;
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: BookDto,
  ): Promise<Book> {
    const existingBook = await this.bookService.findById(id);
    if (!existingBook) throw new NotFoundException();
    return await this.bookService.updateBook(book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    const existingBook = await this.bookService.findById(id);
    if (!existingBook) throw new NotFoundException();
    return await this.bookService.deleteBook(id);
  }
}
